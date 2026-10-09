import { User } from "lucide-react";

import Button from "@/components/ui/button";
import InputText from "@/components/ui/input-text";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button>Create</Button>
            <Button isLoading>Save</Button>
          </div>
        </div>
        <div className="font-mono text-xs text-muted">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>

        <InputText label="Name" placeholder="Your name" startContent={<User size={18} />} />
      </div>
    </div>
  );
}
