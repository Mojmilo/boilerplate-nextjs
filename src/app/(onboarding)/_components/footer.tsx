import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

type Submenu = {
  title: string;
  href: string;
};

type Menu = {
  title: string;
  submenus: Submenu[];
};

const menus: Menu[] = [
  {
    title: "Company",
    submenus: [
      {
        title: "About",
        href: "/#"
      },
      {
        title: "Privacy",
        href: "/#"
      },
      {
        title: "Terms",
        href: "/#"
      },
      {
        title: "Careers",
        href: "/#"
      }
    ]
  },
  {
    title: "Support",
    submenus: [
      {
        title: "Docs",
        href: "/#"
      },
      {
        title: "FAQ",
        href: "/#"
      },
      {
        title: "Blog",
        href: "/#"
      },
      {
        title: "Contact",
        href: "/#"
      }
    ]
  },
  {
    title: "Inspiration",
    submenus: [
      {
        title: "Shadcn",
        href: "/#"
      },
      {
        title: "Taxonomy",
        href: "/#"
      },
      {
        title: "Skateshop",
        href: "/#"
      },
      {
        title: "Acme Corp",
        href: "/#"
      }
    ]
  }
];

export default function Footer() {
  return (
    <footer id={'footer'} className="py-6 md:py-0 border-t border-border/40">
      <div className="flex flex-col items-start justify-center gap-10 px-8 lg:px-20 py-10">
        <div className="flex flex-wrap-reverse justify-between items-end gap-10 w-full">
          {menus.map((menu, index) => (
            <div key={index} className="flex flex-col items-start justify-center gap-2">
              <span className={'font-semibold'}>{menu.title}</span>
              {menu.submenus.map((submenu, index) => (
                <Link key={index} href={submenu.href}>
                  <Button variant={'link'}
                          className={'text-muted-foreground hover:text-foreground p-0 h-auto'}>{submenu.title}</Button>
                </Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-col items-start justify-center">
              <span className={'text-lg font-semibold'}>Subscribe Our Newsletter</span>
              <span className={'text-sm max-w-[300px] text-muted-foreground'}>
              Join our newsletter today to stay up to date on features and important releases
            </span>
            </div>
            <div className="flex flex-wrap justify-start items-center gap-4">
              <Input placeholder={'Enter your email'} className={'w-[300px]'}/>
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          Built on top of{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/salimi-my/shadcn-ui-sidebar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}