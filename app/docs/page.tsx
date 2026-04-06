"use client";

import Button from "@/components/ui/Button";
import InputNumber from "@/components/ui/InputNumber";
import InputText from "@/components/ui/InputText";
import Switch from "@/components/ui/Switch";
import { buttonStyle } from "@/styles";
import { Button as HeroButton, Modal, Spinner } from "@heroui/react";
import { useTheme } from "next-themes";
import Link from "next/link";

function DocsPage() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex gap-2">
        <Switch
          label="Theme Switch"
          isSelected={resolvedTheme === "dark"}
          onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
        />

        <HeroButton className="">Button</HeroButton>

        <Link className={buttonStyle()} href="/docs">
          Link
        </Link>

        <Button isLoading>My button</Button>

        <Modal>
          <Button>Open Modal</Button>
          <Modal.Backdrop variant="blur">
            <Modal.Container placement="top">
              <Modal.Dialog>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon />
                  <Modal.Heading />
                </Modal.Header>
                <Modal.Body />
                <Modal.Footer />
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>

        <span className=""> Loading...</span>

        <Spinner />
      </div>

      <div className="max-w-2xl flex flex-col gap-5">
        <InputText
          isRequired
          label="Name"
          labelPlacement="left"
          placeholder="Type your name"
          startContent="Mr."
        />

        <InputText
          isRequired
          // isDisabled
          label="Email"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          labelPlacement="left"
          placeholder="Type your email"
          // descriptionPlacement="top"
          isInvalid
          errorMessage="error Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit a qui atque quos error et ipsam quae tenetur. Labore, provident?"
          // classNames={{ inputWrapper: "sm:max-w-72" }}
        />

        <InputNumber
          label="Price"
          labelPlacement="left"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          isDisabled
          isInvalid
          errorMessage="error Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit a qui atque quos error et ipsam quae tenetur. Labore, provident?"
        />
      </div>
    </div>
  );
}

export default DocsPage;
