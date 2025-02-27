import { Check, ChevronsUpDown, LucideRefreshCw } from "lucide-react";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Separator } from "../../ui/separator";
import { useSchema } from "@/context/schema-provider";

export default function TableCombobox({
  value,
  onChange,
  disabled,
  borderless,
}: Readonly<{
  value?: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  borderless?: boolean;
}>) {
  const [open, setOpen] = useState(false);
  const { currentSchema, refresh } = useSchema();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        {borderless ? (
          <div className="justify-between flex w-full px-2 items-center">
            {value ?? "No table selected"}
            <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
          </div>
        ) : (
          <Button variant="outline" className="justify-between flex w-full">
            {value ?? "No table selected"}
            <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[250px]">
        <Command>
          <CommandInput placeholder="Search table name..." />

          <CommandEmpty>No table found.</CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-auto">
            {currentSchema.map((table) => (
              <CommandItem
                key={table.name}
                value={table.name}
                onSelect={() => {
                  onChange(table.name);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === table.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {table.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        <div className="p-1">
          <Separator />
          <Button
            variant="link"
            className="w-full"
            size={"sm"}
            onClick={() => {
              refresh();
            }}
          >
            <LucideRefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
