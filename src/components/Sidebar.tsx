'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const NAV_ITEMS = [
  { href: '/', label: 'Game' },
  { href: '/rules', label: 'Rules' },
  { href: '/reference', label: 'Reference' },
  { href: '/settings', label: 'Settings' },
] as const;

function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between">
        <span className="truncate text-sm font-semibold group-data-[collapsible=icon]:hidden">
          Braille Quiz
        </span>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-1 p-2">
          {NAV_ITEMS.map((item) => {
            const isActive = normalize(pathname) === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                  <Link href={item.href}>
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
