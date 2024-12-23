import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: '/', label: 'SaaS Admin Template' },
  { href: '/admin', label: 'Admin' },
  { href: '/admin/customers', label: 'Customers' },
  { href: '/admin/subscriptions', label: 'Subscriptions' },
];

export function Header({ currentPath }: { currentPath: string }) {
  return (
    <nav class="flex items-center space-x-4 lg:space-x-6 mx-6 h-16">
      {links.map((link) => (
        <a
          className={cn(
            'text-sm font-medium leading-none text-foreground',
            currentPath === link.href ? 'text-foreground' : 'text-muted-foreground',
          )}
          href={link.href}
          aria-current={currentPath === link.href ? 'page' : undefined}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
