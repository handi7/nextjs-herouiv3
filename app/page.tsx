import { Separator, Skeleton, Spinner } from "@heroui/react";
import { ArrowRightIcon, PlusIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import InputCombobox from "@/components/ui/InputCombobox";
import InputComboboxMultiple from "@/components/ui/InputComboboxMultiple";
import InputFormattedNumber from "@/components/ui/InputFormattedNumber";
import InputNumber from "@/components/ui/InputNumber";
import InputSelect from "@/components/ui/InputSelect";
import InputText from "@/components/ui/InputText";
import InputTextarea from "@/components/ui/InputTextarea";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Archived", value: "archived", isDisabled: true },
];

const peopleOptions = [
  { label: "Jane Doe", value: "jane" },
  { label: "John Smith", value: "john" },
  { label: "Alex Johnson", value: "alex" },
  { label: "Maria Garcia", value: "maria" },
];

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button startContent={<PlusIcon />}>Create</Button>
            <Button endContent={<ArrowRightIcon />} variant="outline">
              Continue
            </Button>
            <Button isLoading loadingText="Saving...">
              Save
            </Button>
          </div>
        </div>
        <div className="font-mono text-xs text-muted">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>

        <div className="flex items-center gap-3">
          <Spinner size="sm" />
          <Skeleton className="h-4 w-40 rounded-lg" />
        </div>

        <Separator />

        <InputText
          isRequired
          label="Username"
          placeholder="Username"
          startContent={<UserIcon size={18} />}
        />

        <InputText
          label="Email"
          placeholder="you@example.com"
          description="We'll never share your email."
          errorMessage="Email is already taken."
        />

        <InputTextarea
          isRequired
          label="Description"
          placeholder="Write a description..."
          description="Keep it short and clear."
        />

        <InputNumber isRequired label="Quantity" description="Minimum 0." minValue={0} />

        <InputNumber
          isRequired
          hideStepper
          label="Amount"
          placeholder="0"
          minValue={0}
          startContent="Rp"
        />

        <InputFormattedNumber label="Formatted amount" startContent="Rp" defaultValue={1250000.5} />

        <InputSelect showClear label="Status" placeholder="Select status" options={statusOptions} />

        <InputCombobox
          label="Assignee"
          placeholder="Select assignee"
          defaultValue="jane"
          options={peopleOptions}
        />

        <InputComboboxMultiple
          label="Reviewers"
          placeholder="Select reviewers"
          defaultValue={["jane", "john"]}
          options={peopleOptions}
        />
      </div>
    </div>
  );
}
