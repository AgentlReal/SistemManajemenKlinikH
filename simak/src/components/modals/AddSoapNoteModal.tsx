import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { SOAPNote } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const soapNoteSchema = z.object({
  subjective: z.string().min(1, "Subjective notes are required."),
  objective: z.string().min(1, "Objective notes are required."),
  assessment: z.string().min(1, "Assessment is required."),
  plan: z.string().min(1, "Plan is required."),
});

type SoapNoteFormData = z.infer<typeof soapNoteSchema>;

interface AddSoapNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<SOAPNote, "id" | "date" | "doctor">) => void;
}

export function AddSoapNoteModal({
  isOpen,
  onClose,
  onAdd,
}: AddSoapNoteModalProps) {
  const form = useForm<SoapNoteFormData>({
    resolver: zodResolver(soapNoteSchema),
    defaultValues: {
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
    },
  });

  const onSubmit = (data: SoapNoteFormData) => {
    onAdd(data);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-3/4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New SOAP Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subjective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjective (S)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Patient complaints..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objective (O)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observations and measurements..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assessment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment (A)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Diagnosis..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan (P)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Treatment plan..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="hover:cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 hover:cursor-pointer"
              >
                Save Note
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
