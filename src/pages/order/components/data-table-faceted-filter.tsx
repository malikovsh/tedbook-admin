import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Button } from '@/components/custom/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface DataTableFacetedFilterProps {
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
}

export function DataTableFacetedFilter({
  title,
  options,
  selectedValue,
  setSelectedValue,
}: DataTableFacetedFilterProps) {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="w-4 h-4 mr-2" />
          {title}
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <Badge
                variant="secondary"
                className="px-1 font-normal rounded-sm"
              >
                {
                  options.find((option) => option.value === selectedValue)
                    ?.label
                }
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{t('global.table.toolbar.noResults')}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setSelectedValue(
                      selectedValue === option.value ? null : option.value,
                    );
                  }}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      selectedValue === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible',
                    )}
                  >
                    <CheckIcon className={cn('h-4 w-4')} />
                  </div>
                  {option.icon && (
                    <option.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                  )}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValue(null);
                    }}
                    className="justify-center text-center"
                  >
                    {t('global.table.toolbar.clear')}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
