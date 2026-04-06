"use client";

import useMounted from "@/hooks/useMounted";
import { Label, Switch as HeroSwitch, SwitchProps } from "@heroui/react";

interface Props extends SwitchProps {
  label?: string;
}

function Switch({ label, isSelected, ...props }: Props) {
  const isMounted = useMounted();

  return (
    <HeroSwitch {...props} isSelected={isMounted ? isSelected : false}>
      <HeroSwitch.Control>
        <HeroSwitch.Thumb />
      </HeroSwitch.Control>

      <HeroSwitch.Content>
        <Label className="text-sm">{label}</Label>
      </HeroSwitch.Content>
    </HeroSwitch>
  );
}

export default Switch;
