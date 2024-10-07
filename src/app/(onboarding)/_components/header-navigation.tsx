import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {MenuIcon, Rocket} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";

type Submenu = {
  title: string;
  href: string;
  description: string;
};

type Menu = {
  title: string;
  href?: string;
  submenu?: Submenu[];
};

const menus: Menu[] = [
  {
    title: "Products",
    submenu: [
      {
        title: "Product 1",
        href: "/products/product-1",
        description: "The first product, the first product, the first product, the first product, the first product",
      },
      {
        title: "Product 2",
        href: "/products/product-2",
        description: "The second product, the second product, the second product, the second product, the second product",
      },
      {
        title: "Product 3",
        href: "/products/product-3",
        description: "The third product, the third product, the third product, the third product, the third product",
      }
    ],
  },
  {
    title: "Solutions",
    submenu: [
      {
        title: "Solution 1",
        href: "/solutions/solution-1",
        description: "The first solution, the first solution, the first solution, the first solution, the first solution",
      },
      {
        title: "Solution 2",
        href: "/solutions/solution-2",
        description: "The second solution, the second solution, the second solution, the second solution, the second solution",
      },
      {
        title: "Solution 3",
        href: "/solutions/solution-3",
        description: "The third solution, the third solution, the third solution, the third solution, the third solution",
      },
      {
        title: "Solution 4",
        href: "/solutions/solution-4",
        description: "The fourth solution, the fourth solution, the fourth solution, the fourth solution, the fourth solution",
      }
    ],
  },
  {
    title: "Resources",
    submenu: [
      {
        title: "Blog",
        href: "/resources/blog",
        description: "Read the latest articles",
      },
      {
        title: "Docs",
        href: "/resources/docs",
        description: "Read the documentation",
      },
    ],
  },
  {
    title: "Partners",
    submenu: [
      {
        title: "Affiliate Program",
        href: "/partners/affiliate-program",
        description: "Join the affiliate program",
      },
      {
        title: "Partner Program",
        href: "/partners/partner-program",
        description: "Join the partner program",
      },
    ],
  },
  {
    title: "Pricing",
    href: "/pricing",
  }
];

export function HeaderNavigation({ isDesktop }: { isDesktop: boolean }) {
  return isDesktop ? (
    <nav className={'absolute left-1/2 -translate-x-1/2 flex justify-center items-center'}>
      <HeaderNavigationMenu isDesktop={isDesktop}/>
    </nav>
  ) : (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20}/>
        </Button>
      </SheetTrigger>
      <SheetContent className={'flex flex-col px-0'}>
        <ScrollArea className="[&>div>div[style]]:!block">
          <div className={'flex flex-col gap-8 px-6'}>
            <Link
              href="/public"
            >
              <SheetClose
                className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300">
                <Rocket className="w-6 h-6 mr-3"/>
                <span className="font-bold text-xl">QuickSaaSBoilerplate</span>
                <span className="sr-only">QuickSaaSBoilerplate</span>
              </SheetClose>
            </Link>
            <nav>
              <HeaderNavigationMenu isDesktop={isDesktop}/>
            </nav>
            <Link href="/auth/login">
              <SheetClose>
                <Button>Get started</Button>
              </SheetClose>
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function HeaderNavigationMenu({isDesktop}: { isDesktop: boolean }) {
  const HeaderNavigationMenu = isDesktop ? NavigationMenu : Accordion;
  const HeaderNavigationList = isDesktop ? NavigationMenuList : "div";
  const HeaderNavigationItem = isDesktop ? NavigationMenuItem : AccordionItem;
  const HeaderNavigationTrigger = isDesktop ? NavigationMenuTrigger : AccordionTrigger;
  const HeaderNavigationContent = isDesktop ? NavigationMenuContent : AccordionContent;

  return (
    <HeaderNavigationMenu {...(isDesktop ? {} : {type: 'single', collapsible: true}) as any}>
      <HeaderNavigationList>
        {menus.map((menu) => (
          <HeaderNavigationItem key={menu.title} {...(isDesktop ? {} : {value: menu.title}) as any}>
            {menu.submenu ? (
              <>
                <HeaderNavigationTrigger>{menu.title}</HeaderNavigationTrigger>
                <HeaderNavigationContent>
                  <HeaderNavigationSubitem isDesktop={isDesktop} menu={menu} />
                </HeaderNavigationContent>
              </>
            ) : (
              <HeaderNavigationLink isDesktop={isDesktop} menu={menu}/>
            )}
          </HeaderNavigationItem>
        ))}
      </HeaderNavigationList>
    </HeaderNavigationMenu>
  )
}

function HeaderNavigationLink({ isDesktop, menu }: { isDesktop: boolean, menu: Menu }) {
  return isDesktop ? (
    <Link href={menu.href!}>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {menu.title}
      </NavigationMenuLink>
    </Link>
  ) : (
    <Link href={menu.href!}
          className={'flex flex-1 justify-start items-center text-sm font-medium transition-all hover:underline'}>
      <SheetClose className={'w-full py-4 text-start'}>
        {menu.title}
      </SheetClose>
    </Link>
  );
}

function HeaderNavigationSubitem({ isDesktop, menu }: { isDesktop: boolean, menu: Menu }) {
  return isDesktop ? (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {menu.submenu!.map((submenu) => (
        <HeaderNavigationSublink key={submenu.title} isDesktop={isDesktop} submenu={submenu}/>
      ))}
    </ul>
  ) : (
    <ul className="flex flex-col items-start justify-center gap-1">
      {menu.submenu!.map((submenu) => (
        <HeaderNavigationSublink key={submenu.title} isDesktop={isDesktop} submenu={submenu}/>
      ))}
    </ul>
  );
}

function HeaderNavigationSublink({isDesktop, submenu}: { isDesktop: boolean, submenu: Submenu }) {
  const HeaderNavigationSublink = ({ children }: { children: React.ReactNode }) => isDesktop ? (
    <li>
      <NavigationMenuLink asChild>
        {children}
      </NavigationMenuLink>
    </li>
  ) : (
    <li>
      {children}
    </li>
  );

  return (
    <HeaderNavigationSublink>
      <Link
        href={submenu.href}
        className={"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"}
      >
          <span className="flex justify-start items-center gap-2">
            <span className="text-sm font-medium leading-none">{submenu.title}</span>
          </span>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {submenu.description}
        </p>
      </Link>
    </HeaderNavigationSublink>
  )
}