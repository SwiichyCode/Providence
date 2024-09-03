import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/core/components/ui/form";
import { Textarea } from "@/core/components/ui/textarea";
import type { Control } from "react-hook-form";

export interface TextAreaFormProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: Control<any>;
  name: string;
  label?: string;
}

const TextAreaForm = React.forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  ({ className, control, name, label, ...props }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea {...field} ref={ref} {...props} />
            </FormControl>

            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    );
  },
);

TextAreaForm.displayName = "TextAreaForm";
export { TextAreaForm };
