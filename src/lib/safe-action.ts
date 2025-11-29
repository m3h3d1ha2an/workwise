import type { z } from "zod";
import { HandleActionError } from "~/helpers/handle-action-error";
import type { ActionResult } from "~/lib/types";

/**
 * Wrapper for Server Actions to handle validation and errors
 */
export const safeAction =
  <Input extends z.ZodType, Output>(
    schema: Input,
    action: (data: z.infer<Input>) => Promise<ActionResult<Output>>
  ) =>
  async (
    _prevState: ActionResult<Output> | undefined,
    formData: FormData
  ): Promise<ActionResult<Output>> => {
    try {
      const data = Object.fromEntries(formData);
      const validated = schema.parse(data);
      return await action(validated);
    } catch (error) {
      return HandleActionError(error) as ActionResult<Output>;
    }
  };
