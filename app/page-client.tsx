"use client";

import { useState } from "react";

import DatePicker from "@/components/ui/DatePicker";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { type DateRange } from "@/lib/dates";

/** Controlled date pickers, showing the `Date` values they emit. */
function PageClient() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 9, 9));
  const [range, setRange] = useState<DateRange | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <DatePicker isRequired label="Date" value={date} onChange={setDate} />
      <p className="font-mono text-xs text-muted">value: {date?.toDateString() ?? "null"}</p>

      <DateRangePicker
        label="Period"
        description="Pick a start and end date."
        value={range}
        onChange={setRange}
      />
      <p className="font-mono text-xs text-muted">
        value: {range ? `${range.start.toDateString()} → ${range.end.toDateString()}` : "null"}
      </p>
    </div>
  );
}

export default PageClient;
