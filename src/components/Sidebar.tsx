'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { Gamepad2, BookOpen, Grid2x2, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const NAV_ITEMS = [
  { href: '/', label: 'Game', icon: Gamepad2 },
  { href: '/rules', label: 'Rules', icon: BookOpen },
  { href: '/reference', label: 'Reference', icon: Grid2x2 },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const;

function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}

interface AppSidebarProps {
  width: number;
  onWidthChange: (width: number) => void;
  minWidth: number;
  maxWidth: number;
}

export default function AppSidebar({ width, onWidthChange, minWidth, maxWidth }: AppSidebarProps) {
  const pathname = usePathname();
  const { state, isMobile, toggleSidebar, setOpen } = useSidebar();
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startWidth: number;
    moved: boolean;
    open: boolean;
  } | null>(null);

  const handleRailPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isMobile) return;
      e.preventDefault();
      dragRef.current = {
        startX: e.clientX,
        startWidth: width,
        moved: false,
        open: state === 'expanded',
      };

      const onMove = (moveEvent: PointerEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        const delta = moveEvent.clientX - drag.startX;
        if (Math.abs(delta) > 3 && !drag.moved) {
          drag.moved = true;
          // Disable the CSS width transition only once an actual drag starts,
          // so width tracks the pointer 1:1 instead of chasing it with easing.
          setIsDragging(true);
        }
        if (!drag.moved) return;

        // Snap open/closed as the drag crosses the minimum width, in either
        // direction, instead of getting stuck at an awkward in-between size.
        const rawWidth = drag.startWidth + delta;
        const shouldBeOpen = rawWidth >= minWidth;
        if (shouldBeOpen !== drag.open) {
          drag.open = shouldBeOpen;
          setOpen(shouldBeOpen);
        }
        if (shouldBeOpen) {
          onWidthChange(Math.min(maxWidth, rawWidth));
        }
      };
      const onUp = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        if (dragRef.current && !dragRef.current.moved) toggleSidebar();
        setIsDragging(false);
        dragRef.current = null;
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [isMobile, state, width, minWidth, maxWidth, onWidthChange, toggleSidebar, setOpen],
  );

  return (
    <Sidebar collapsible="icon" dragging={isDragging} className="border-r-0">
      <SidebarHeader className="flex-row items-center justify-between gap-2 px-4 py-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 overflow-hidden transition-[opacity,width] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 group-data-[dragging=true]:transition-none"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
            ⠃
          </span>
          <span className="truncate text-[0.95rem] font-semibold tracking-tight">
            Braille Quiz
          </span>
        </Link>
        <SidebarTrigger className="ml-auto rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-foreground group-data-[collapsible=icon]:ml-0" />
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent className="px-3 pt-4 pb-3 group-data-[collapsible=icon]:px-2">
        <SidebarMenu className="gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = normalize(pathname) === item.href;
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  className="h-10 rounded-lg text-[0.925rem] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-sm data-[active=true]:hover:bg-primary"
                >
                  <Link href={item.href}>
                    <Icon className="size-[18px] shrink-0" />
                    <span className="truncate transition-opacity duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[collapsible=icon]:opacity-0 group-data-[dragging=true]:transition-none">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail onPointerDown={handleRailPointerDown} onClick={(e) => e.preventDefault()} />
    </Sidebar>
  );
}
