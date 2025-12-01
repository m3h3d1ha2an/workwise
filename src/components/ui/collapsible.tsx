"use client";

import {
  CollapsibleContent as Content,
  Root,
  CollapsibleTrigger as Trigger,
} from "@radix-ui/react-collapsible";

const Collapsible = ({ ...props }: React.ComponentProps<typeof Root>) => (
  <Root data-slot="collapsible" {...props} />
);

const CollapsibleTrigger = ({
  ...props
}: React.ComponentProps<typeof Trigger>) => (
  <Trigger data-slot="collapsible-trigger" {...props} />
);

const CollapsibleContent = ({
  ...props
}: React.ComponentProps<typeof Content>) => (
  <Content data-slot="collapsible-content" {...props} />
);

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
