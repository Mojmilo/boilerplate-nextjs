import {
  Users,
  LucideIcon, KeyRound, Settings2, Boxes
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

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/account",
          label: "Teams",
          active: pathname === `/account`,
          icon: Users,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/account/settings",
          label: "General",
          active: pathname === `/account/settings`,
          icon: Settings2,
          submenus: []
        },
        {
          href: "/account/settings/authentication",
          label: "Authentication",
          active: pathname.includes(`/account/settings/authentication`),
          icon: KeyRound,
          submenus: []
        },
        {
          href: "/account/settings/sessions",
          label: "Sessions",
          active: pathname.includes(`/account/settings/sessions`),
          icon: Boxes,
          submenus: []
        }
      ]
    }
  ];
}
