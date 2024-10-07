import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon, WalletMinimal
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getTeamMenuList(teamId: string, pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/teams/${teamId}`,
          label: "Dashboard",
          active: pathname === `/teams/${teamId}`,
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes(`/teams/${teamId}/posts`),
          icon: SquarePen,
          submenus: [
            {
              href: `/teams/${teamId}/posts`,
              label: "All Posts",
              active: pathname === `/teams/${teamId}/posts`
            },
            {
              href: `/teams/${teamId}/posts/new`,
              label: "New Post",
              active: pathname === `/teams/${teamId}/posts/new`
            }
          ]
        },
        {
          href: `/teams/${teamId}/categories`,
          label: "Categories",
          active: pathname.includes(`/teams/${teamId}/categories`),
          icon: Bookmark,
          submenus: []
        },
        {
          href: `/teams/${teamId}/tags`,
          label: "Tags",
          active: pathname.includes(`/teams/${teamId}/tags`),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: `/teams/${teamId}/settings/members`,
          label: "Members",
          active: pathname.includes(`/teams/${teamId}/settings/members`),
          icon: Users,
          submenus: []
        },
        {
          href: `/teams/${teamId}/settings/billing`,
          label: "Billing",
          active: pathname.includes(`/teams/${teamId}/settings/billing`),
          icon: WalletMinimal,
          submenus: []
        }
      ]
    }
  ];
}
