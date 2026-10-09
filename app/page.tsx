import { Separator, Skeleton, Spinner } from "@heroui/react";
import { ArrowRightIcon, PlusIcon, UserIcon } from "lucide-react";

import { DateDemo, OverlayDemo, ToastDemo } from "./page-client";

import ThemeSwitch from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/Button";
import InputCheckbox from "@/components/ui/InputCheckbox";
import InputCheckboxGroup from "@/components/ui/InputCheckboxGroup";
import InputCombobox from "@/components/ui/InputCombobox";
import InputComboboxMultiple from "@/components/ui/InputComboboxMultiple";
import InputFormattedNumber from "@/components/ui/InputFormattedNumber";
import InputNumber from "@/components/ui/InputNumber";
import InputRadioGroup from "@/components/ui/InputRadioGroup";
import InputSelect from "@/components/ui/InputSelect";
import InputSlider from "@/components/ui/InputSlider";
import InputSwitch from "@/components/ui/InputSwitch";
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
        <ToastDemo />

        <OverlayDemo />

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

        <InputSlider
          isRequired
          showValue
          label="Progress"
          description="Adjust the progress value."
          defaultValue={45}
          step={5}
        />

        <InputSlider showValue label="Budget range" defaultValue={[20, 80]} step={5} />

        <DateDemo />

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

        <InputCheckbox
          isRequired
          label="Accept terms"
          description="You agree to the terms and privacy policy."
        />

        <InputSwitch
          defaultSelected
          label="Email notifications"
          description="Receive email updates for important activity."
        />

        <ThemeSwitch />

        <InputCheckboxGroup
          isRequired
          label="Permissions"
          description="Select one or more permissions."
          defaultValue={["read"]}
          options={[
            { label: "Create", value: "create" },
            { label: "Read", value: "read" },
            { label: "Update", value: "update" },
            { label: "Delete", value: "delete", isDisabled: true },
          ]}
        />

        <InputRadioGroup
          isRequired
          label="Visibility"
          description="Choose who can see this item."
          defaultValue="public"
          options={[
            { label: "Public", value: "public", description: "Anyone with the link." },
            { label: "Private", value: "private", description: "Only you." },
            { label: "Team only", value: "team", isDisabled: true },
          ]}
        />

        <InputRadioGroup
          label="Size"
          labelPlacement="left"
          orientation="horizontal"
          defaultValue="md"
          options={[
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ]}
        />

        <InputCheckbox label="Subscribe" errorMessage="You must subscribe to continue." />

        <InputSwitch label="Two-factor auth" errorMessage="Required for admins." />
      </div>
    </div>
  );
}
