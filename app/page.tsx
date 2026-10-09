import { Separator, Skeleton, Spinner } from "@heroui/react";
import { ArrowRightIcon, PlusIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import InputNumber from "@/components/ui/InputNumber";
import InputText from "@/components/ui/InputText";

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
          <Skeleton className="h-4 w-40 rounded-md" />
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

        <InputNumber isRequired label="Amount" description="Minimum 0." minValue={0} />
      </div>
    </div>
  );
}
