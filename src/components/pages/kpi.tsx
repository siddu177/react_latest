import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card"
  import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  } from "@/components/ui/accordion"
  import ChartPieDonut from '../charts/pieChart'
  
  export default function CollapsibleCard() {
    return (
      <Card className="w-full shadow-md border border-border rounded-lg">
        {/* defaultValue opens the item initially */}
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            {/* Trigger section */}
            <AccordionTrigger className="w-full px-4 py-3 hover:bg-accent/50 rounded-t-lg [&[data-state=open]>div>svg]:rotate-180 transition">
              <div className="flex w-full items-center justify-between">
                <CardTitle className="text-base font-semibold w-full">
                  KPI  Details
                </CardTitle>
                {/* Chevron icon */}
              </div>
            </AccordionTrigger>
  
            {/* Content section */}
            <AccordionContent className="px-4 pb-4">
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-0">
                <ChartPieDonut />
                <ChartPieDonut />
                <ChartPieDonut />
                <ChartPieDonut />
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    )
  }
  