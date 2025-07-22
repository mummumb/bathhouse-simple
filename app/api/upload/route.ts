import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request): Promise<NextResponse> {
  console.log("Upload API called")
  
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase configuration is missing")
    return NextResponse.json({ 
      error: "Upload service not configured. Please add Supabase environment variables.",
      needsConfiguration: true
    }, { status: 500 })
  }

  // Create Supabase client with service role for storage operations
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  // For now, we'll allow uploads without user authentication since we're using service role
  // In production, you might want to add authentication checks here

  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")

  console.log("Upload filename:", filename)

  if (!filename) {
    return NextResponse.json({ error: "Filename is required" }, { status: 400 })
  }

  try {
    console.log("Request headers:", Object.fromEntries(request.headers.entries()));
    console.log("Request method:", request.method);
    
    // Handle FormData upload
    let formData;
    try {
      formData = await request.formData();
      console.log("FormData parsed successfully");
    } catch (formError) {
      console.error("FormData parsing error:", formError);
      return NextResponse.json({ 
        error: "Failed to parse form data",
        details: formError instanceof Error ? formError.message : String(formError)
      }, { status: 400 });
    }
    
    const formFile = formData.get("file");
    
    if (!formFile || !(formFile instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }
    
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(formFile.type)) {
      return NextResponse.json({ error: "File type not allowed. Only images are supported." }, { status: 400 });
    }
    
    // Validate file size (10MB limit to match bucket config)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (formFile.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds limit (10MB)" }, { status: 400 });
    }

    // Generate a unique filename
    const fileExtension = filename?.split('.').pop() || 'jpg';
    const uniqueFilename = `uploads/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
    
    // Convert File to ArrayBuffer for Supabase
    const fileBuffer = await formFile.arrayBuffer();
    
    console.log("Uploading to Supabase Storage:", { 
      uniqueFilename, 
      contentType: formFile.type, 
      size: formFile.size,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    })
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(uniqueFilename, fileBuffer, {
        contentType: formFile.type,
        upsert: false
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      
      // Check if it's an authentication error
      if (uploadError.message?.includes('401') || uploadError.message?.includes('unauthorized')) {
        return NextResponse.json({ 
          error: "Authentication failed. Please check your Supabase configuration.",
          details: uploadError
        }, { status: 401 });
      }
      
      return NextResponse.json({ 
        error: `Upload failed: ${uploadError.message}`,
        details: uploadError
      }, { status: 500 });
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(uniqueFilename);

    const publicUrl = urlData.publicUrl;
    
    console.log("Upload successful:", publicUrl)

    // Store reference in database (optional - don't fail upload if this fails)
    supabase.from("files").insert({
      url: publicUrl,
      filename: uniqueFilename,
      content_type: formFile.type,
      size: formFile.size,
      user_id: null
    }).then(({ error }) => {
      if (error) {
        console.log("Note: Could not log file to database (upload still successful):", error.message);
      } else {
        console.log("File reference stored in database");
      }
    }).catch(() => {
      // Silently ignore database logging errors
    });

    return NextResponse.json({
      url: publicUrl,
      path: uniqueFilename,
      size: formFile.size,
      type: formFile.type
    })
  } catch (error) {
    console.error("Error uploading to Supabase:", error)
    
    // Provide more specific error information
    let errorMessage = "Failed to upload file to Supabase Storage"
    if (error instanceof Error) {
      errorMessage = `Upload failed: ${error.message}`
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
