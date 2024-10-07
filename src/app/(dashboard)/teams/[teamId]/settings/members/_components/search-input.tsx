'use client';

import {Input} from "@/components/ui/input";
import {useQueryState} from "nuqs";
import {Search} from "lucide-react";

export default function SearchInput() {
  const [q, setQ] = useQueryState('q', { defaultValue: '', shallow: false });

  return (
    <div className="relative w-full">
      <Input
        placeholder="Filter..."
        value={q}
        onChange={e => setQ(e.target.value || null)}
        className={'pl-10'}
      />
      <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground w-4 h-4"/>
    </div>
  )
}