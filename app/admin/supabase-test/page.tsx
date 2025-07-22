'use client';

import { useState, useEffect } from 'react';

interface TestResult {
    status: string;
    message: string;
    responseTimeMs?: number;
    tests?: {
        basicConnectivity: { status: string; message: string };
        authentication: { status: string; message: string; sessionExists: boolean };
        queryPerformance: { status: string; message: string; tableCount: number };
        databaseUrl: { status: string; message: string };
    };
    environment?: {
        supabaseUrl: string;
        anonKeySet: boolean;
        serviceRoleKeySet: boolean;
        databaseUrlSet: boolean;
    };
    error?: string;
    details?: any;
}

export default function SupabaseTestPage() {
    const [testResult, setTestResult] = useState<TestResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [healthCheckResult, setHealthCheckResult] = useState<any>(null);
    const [healthCheckLoading, setHealthCheckLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/test-supabase');
            const data = await response.json();
            setTestResult(data);
        } catch (error) {
            setTestResult({
                status: 'error',
                message: 'Failed to run test',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        } finally {
            setLoading(false);
        }
    };

    const runHealthCheck = async () => {
        setHealthCheckLoading(true);
        try {
            const response = await fetch('/api/health-supabase');
            const data = await response.json();
            setHealthCheckResult(data);
        } catch (error) {
            setHealthCheckResult({
                status: 'unhealthy',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        } finally {
            setHealthCheckLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'passed':
            case 'success':
            case 'healthy':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'warning':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'failed':
            case 'error':
            case 'unhealthy':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Comprehensive Test */}
                <div className="border rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Comprehensive Test</h2>
                    <p className="text-gray-600 mb-4">
                        Run a comprehensive test of your Supabase connection, including authentication and query performance.
                    </p>

                    <button
                        onClick={runTest}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 mb-6"
                    >
                        {loading ? 'Running Test...' : 'Run Test'}
                    </button>

                    {testResult && (
                        <div className={`mt-4 p-4 border rounded-md ${getStatusColor(testResult.status)}`}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold">Test Result: {testResult.status.toUpperCase()}</h3>
                                {testResult.responseTimeMs && (
                                    <span className="text-sm text-gray-500">{testResult.responseTimeMs}ms</span>
                                )}
                            </div>
                            <p className="mb-4">{testResult.message}</p>

                            {testResult.tests && (
                                <div className="space-y-3 mt-4">
                                    <h4 className="font-medium">Test Details:</h4>

                                    <div className={`p-3 border rounded ${getStatusColor(testResult.tests.basicConnectivity.status)}`}>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Basic Connectivity</span>
                                            <span>{testResult.tests.basicConnectivity.status.toUpperCase()}</span>
                                        </div>
                                        <p className="text-sm mt-1">{testResult.tests.basicConnectivity.message}</p>
                                    </div>

                                    <div className={`p-3 border rounded ${getStatusColor(testResult.tests.authentication.status)}`}>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Authentication</span>
                                            <span>{testResult.tests.authentication.status.toUpperCase()}</span>
                                        </div>
                                        <p className="text-sm mt-1">{testResult.tests.authentication.message}</p>
                                        <p className="text-sm mt-1">
                                            Session: {testResult.tests.authentication.sessionExists ? 'Exists' : 'None'}
                                        </p>
                                    </div>

                                    <div className={`p-3 border rounded ${getStatusColor(testResult.tests.queryPerformance.status)}`}>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Query Performance</span>
                                            <span>{testResult.tests.queryPerformance.status.toUpperCase()}</span>
                                        </div>
                                        <p className="text-sm mt-1">{testResult.tests.queryPerformance.message}</p>
                                        <p className="text-sm mt-1">
                                            Tables found: {testResult.tests.queryPerformance.tableCount}
                                        </p>
                                    </div>

                                    <div className={`p-3 border rounded ${getStatusColor(testResult.tests.databaseUrl.status)}`}>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Database URL</span>
                                            <span>{testResult.tests.databaseUrl.status.toUpperCase()}</span>
                                        </div>
                                        <p className="text-sm mt-1">{testResult.tests.databaseUrl.message}</p>
                                    </div>
                                </div>
                            )}

                            {testResult.environment && (
                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Environment:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>Supabase URL: {testResult.environment.supabaseUrl}</li>
                                        <li>Anon Key: {testResult.environment.anonKeySet ? '✅ Set' : '❌ Not set'}</li>
                                        <li>Service Role Key: {testResult.environment.serviceRoleKeySet ? '✅ Set' : '❌ Not set'}</li>
                                        <li>Database URL: {testResult.environment.databaseUrlSet ? '✅ Set' : '❌ Not set'}</li>
                                    </ul>
                                </div>
                            )}

                            {testResult.error && (
                                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                                    <h4 className="font-medium">Error:</h4>
                                    <p className="text-sm">{testResult.error}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Simple Health Check */}
                <div className="border rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Simple Health Check</h2>
                    <p className="text-gray-600 mb-4">
                        Run a basic health check to verify your Supabase connection.
                    </p>

                    <button
                        onClick={runHealthCheck}
                        disabled={healthCheckLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 mb-6"
                    >
                        {healthCheckLoading ? 'Checking...' : 'Run Health Check'}
                    </button>

                    {healthCheckResult && (
                        <div className={`mt-4 p-4 border rounded-md ${getStatusColor(healthCheckResult.status)}`}>
                            <h3 className="font-semibold mb-2">Health Check: {healthCheckResult.status.toUpperCase()}</h3>
                            <p>{healthCheckResult.message}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 p-6 border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Troubleshooting Tips</h2>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium">Connection Issues</h3>
                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                            <li>Verify your Supabase URL and API keys in .env.local</li>
                            <li>Check if your IP is allowed in Supabase dashboard</li>
                            <li>Ensure your Supabase project is active (not paused)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium">Authentication Issues</h3>
                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                            <li>Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is correct</li>
                            <li>Check if JWT expiration is valid</li>
                            <li>Ensure auth.users table exists in your database</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium">Database Issues</h3>
                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                            <li>Verify DATABASE_URL format is correct</li>
                            <li>Check if connection pooling is configured properly</li>
                            <li>Ensure your database is not at connection limit</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}