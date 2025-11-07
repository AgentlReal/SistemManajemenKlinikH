import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const labResultSchema = z.object({
  testType: z.string().min(1, "Test type is required"),
  result: z.string().min(1, "Result is required"),
  status: z.enum(["normal", "abnormal", "pending"]),
  notes: z.string().optional(),
});

type LabResultFormValues = z.infer<typeof labResultSchema>;

interface AddLabResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<LabResultFormValues, "id" | "date" | "doctor">) => void;
}

export function AddLabResultModal({
  isOpen,
  onClose,
  onAdd,
}: AddLabResultModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<LabResultFormValues>({
    resolver: zodResolver(labResultSchema),
  });

  const onValid: SubmitHandler<LabResultFormValues> = (data) => {
    onAdd(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Lab Result</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="testType">Test Type</Label>
              <Input
                {...register("testType")}
                id="testType"
                placeholder="e.g., Complete Blood Count (CBC)"
              />
              {errors.testType && (
                <p className="text-sm text-destructive">
                  {errors.testType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="result">Result</Label>
              <Textarea
                {...register("result")}
                id="result"
                placeholder="e.g., WBC: 7,500/μL, RBC: 5.2 M/μL"
              />
              {errors.result && (
                <p className="text-sm text-destructive">
                  {errors.result.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="abnormal">Abnormal</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-sm text-destructive">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                {...register("notes")}
                id="notes"
                placeholder="e.g., All values within normal range"
              />
            </div>
          </div>

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
              Add Result
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
