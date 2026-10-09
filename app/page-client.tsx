"use client";

import { Drawer, Modal, Popover, Tooltip, toast } from "@heroui/react";
import { CalendarCheckIcon, InfoIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { type DateRange } from "@/lib/dates";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onPress={() => {
          const id = toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            indicator: <CalendarCheckIcon />,
            actionProps: { children: "Undo", onPress: () => toast.close(id) },
          });
        }}
      >
        Show toast
      </Button>

      <Button variant="outline" onPress={() => toast.success("Changes saved")}>
        Success
      </Button>

      <Button
        variant="outline"
        onPress={() =>
          toast.promise(wait(1500), {
            loading: "Uploading file...",
            success: "File uploaded",
            error: "Upload failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}

function OverlayDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Modal>
        <Button variant="secondary">Open modal</Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Delete project?</Modal.Heading>
              </Modal.Header>
              <Modal.Body>This permanently removes the project and its files.</Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button slot="close" variant="danger">
                  Delete
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Drawer>
        <Button variant="secondary">Open drawer</Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="right">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Filters</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>Drawer content goes here.</Drawer.Body>
              <Drawer.Footer>
                <Button slot="close">Apply</Button>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      <Popover>
        <Button variant="secondary">Open popover</Button>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Dialog>
            <Popover.Heading>Popover</Popover.Heading>
            <p className="text-sm text-muted">Short contextual content.</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <Tooltip delay={0}>
        <Button variant="ghost" isIconOnly aria-label="More info">
          <InfoIcon />
        </Button>
        <Tooltip.Content>
          <Tooltip.Arrow />
          More info
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

/** Controlled date pickers, showing the `Date` values they emit. */
function DateDemo() {
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

export { DateDemo, OverlayDemo, ToastDemo };
