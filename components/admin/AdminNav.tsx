"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/dashboard/events', label: 'Events' },
  { href: '/admin/dashboard/rituals', label: 'Rituals' },
  { href: '/admin/dashboard/journal', label: 'Journal' },
  { href: '/admin/dashboard/pages', label: 'Pages' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="admin-nav">
      <ul>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href}
              className={pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href)) ? 'active' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}