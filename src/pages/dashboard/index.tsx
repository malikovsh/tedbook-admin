import { Layout } from '@/components/custom/layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Cross2Icon } from '@radix-ui/react-icons';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { Overview } from './components/overview';
import { ProductsData } from './components/products-data';

const initialState = {
  startDate: undefined,
  endDate: undefined,
};

export default function Dashboard() {
  const [time, setTime] = useState('month');
  const { t } = useTranslation();
  const [date, setDate] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>(initialState);

  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      setDate((prev) => ({
        ...prev,
        startDate: range.from || undefined,
        endDate: range.to || undefined,
      }));
    } else {
      setDate(initialState);
    }
  };

  const handleClear = () => {
    setDate(initialState);
  };

  useEffect(() => {
    toast({
      title: 'Eslatma!',
      description:
        "Dashboardda ma'lumotlar ko'rinmasa kalendardan foydalaning!",
    });
  }, []);

  return (
    <Layout.Body>
      <div className="flex items-center justify-between mb-2 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('pages.dashboard.title')}
        </h1>
      </div>

      <Tabs
        orientation="vertical"
        defaultValue="month"
        className="space-y-4"
        onValueChange={setTime}
      >
        <div className="w-full pb-2 overflow-x-auto">
          <TabsList>
            <TabsTrigger value="month">
              {t('pages.dashboard.tabs.month')}
            </TabsTrigger>
            <TabsTrigger value="week">
              {t('pages.dashboard.tabs.week')}
            </TabsTrigger>
            <TabsTrigger value="today">
              {t('pages.dashboard.tabs.day')}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={time} className="space-y-4">
          {time === 'month' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-auto justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon />
                  {date.startDate || date.endDate ? (
                    `${date.startDate?.toDateString() ?? ''} - ${
                      date.endDate?.toDateString() ?? ''
                    }`
                  ) : (
                    <span>{t('pages.dashboard.calendar')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              {date.startDate || date.endDate ? (
                <Button
                  variant={'outline'}
                  style={{ marginTop: 0 }}
                  className={
                    'ml-2 text-left font-normal text-muted-foreground !space-y-0'
                  }
                  onClick={handleClear}
                >
                  <Cross2Icon />
                </Button>
              ) : null}
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={{
                    from: date.startDate,
                    to: date.endDate,
                  }}
                  onSelect={handleSelect}
                  initialFocus
                  className="w-auto border rounded-md max-w-max"
                />
              </PopoverContent>
            </Popover>
          )}

          <ProductsData time={time} date={date} />
          <div className="flex flex-col lg:flex-row gap-4">
            <Card className="flex-1 lg:flex-[2] shadow">
              <CardHeader>
                <CardTitle>{t('pages.dashboard.status.title')}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview time={time} date={date} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout.Body>
  );
}
