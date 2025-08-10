import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutoSize from "react-textarea-autosize";
import { useState } from "react";
import { toast } from "sonner"
import { z } from "zod";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";   
import { trpc } from '../../../../trpc/server'; 

interface Props {
    projectId: string;
};

const formSchema = z.object({
    value: z.string()
            .min(1, { message: "Value cannot be empty" })
            .max(10000, { message: "Value is too long" }),
});

export const MessageForm = ({ projectId }: Props) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: "",
        }
    });

    const createMessage = useMutation(trpc.messages.create.mutationOptions({
        onSuccess: () => {
            form.reset();
            queryClient.invalidateQueries(trpc.messages.getMany.queryOptions({ projectId }));
            // todo invalidate usage status
            toast.success("Message sent");
        },
        onError: () => {
            toast.error("Failed to send message");
        }
    }));

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createMessage.mutateAsync({
            value: values.value,
            projectId,
        });
    }

    const [isFocused, setIsFocused] = useState(false);
    const showUsage = false;
    const isPending = createMessage.isPending;
    const isButtonDisabled = isPending || !form.formState.isValid;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
                    isFocused && "shadow-xs",
                    showUsage && "rounded-t-none"
                )}
            >
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <TextareaAutoSize
                            {...field}
                            disabled={isPending}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            minRows={2}
                            maxRows={8}
                            className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                            placeholder="What would you like to build?"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.ctrlKey)) {
                                    e.preventDefault();
                                    form.handleSubmit(onSubmit)();
                                }
                            }}
                        />
                    )}
                />
                <div className="flex gap-x-2 items-end justify-between pt-2">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                            <span>Ctrl +</span>Enter
                        </kbd>
                        <span>to submit</span>
                    </div>
                    <Button
                    disabled={isButtonDisabled}
                    className={cn(
                        "size-8 rounded-full",
                        isButtonDisabled && "bg-muted-foreground border"
                    )}
                    >
                        {isPending ? (
                            <Loader2Icon className="animate-spin size-4" />
                        ) : (
                            <ArrowUpIcon />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};