import { useForm } from "@tanstack/react-form";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import FormField from "@/components/auth/common/form-field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import FieldErrorMessage from "@/components/ui/field-error-msg";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { addTaskSchema } from "@/schemas/tasks";

const AddTaskForm = () => {
	const form = useForm({
		validators: {
			onSubmit: addTaskSchema,
		},
		defaultValues: {
			title: "",
			description: "",
			dueDate: new Date(),
			time: "10:30:00",
			priority: "low",
			status: "todo",
		},
		onSubmit: async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		},
	});

	return (
		<form
			className={cn("flex flex-col gap-6")}
			onSubmit={(e) => {
				e.preventDefault();

				form.handleSubmit();
			}}
		>
			<div className="grid gap-6">
				<form.Field name="title">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							htmlFor="title"
							label="Title"
						>
							<Input
								name="title"
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								value={field.state.value}
							/>
						</FormField>
					)}
				</form.Field>
			</div>
			<div className="grid gap-6">
				<form.Field name="description">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							htmlFor="description"
							label="Description"
						>
							<Textarea
								name="description"
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								value={field.state.value}
							/>
						</FormField>
					)}
				</form.Field>
			</div>
			<div className="flex flex-col items-center gap-6 md:flex-row">
				<div className="grid w-full gap-6">
					<form.Field name="priority">
						{(field) => (
							<FormField
								errors={field.state.meta.errors.map((error) => (
									<FieldErrorMessage
										key={error?.message}
										message={error?.message}
									/>
								))}
								htmlFor="priority"
								label="Priority"
							>
								<Select
									defaultValue={field.state.value}
									onValueChange={(value) => field.handleChange(value)}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a priority" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="low">Low</SelectItem>
										<SelectItem value="medium">Medium</SelectItem>
										<SelectItem value="high">High</SelectItem>
									</SelectContent>
								</Select>
							</FormField>
						)}
					</form.Field>
				</div>
				<div className="grid w-full gap-6">
					<form.Field name="status">
						{(field) => (
							<FormField
								errors={field.state.meta.errors.map((error) => (
									<FieldErrorMessage
										key={error?.message}
										message={error?.message}
									/>
								))}
								htmlFor="status"
								label="Status"
							>
								<Select
									defaultValue={field.state.value}
									onValueChange={(value) => field.handleChange(value)}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="todo">Todo</SelectItem>
										<SelectItem value="in_progress">In Progress</SelectItem>
										<SelectItem value="completed">Completed</SelectItem>
									</SelectContent>
								</Select>
							</FormField>
						)}
					</form.Field>
				</div>
			</div>
			<div className="flex flex-col items-center gap-6 md:flex-row">
				<div className="grid w-full gap-6">
					<form.Field name="dueDate">
						{(field) => (
							<FormField
								errors={field.state.meta.errors.map((error) => (
									<FieldErrorMessage
										key={error?.message}
										message={error?.message}
									/>
								))}
								htmlFor="dueDate"
								label="Due Date"
							>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											className="w-full justify-between font-normal"
											id="date-picker"
											variant="outline"
										>
											{field.state.value
												? field.state.value.toLocaleDateString()
												: "Select date"}
											<ChevronDownIcon />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										align="start"
										className="w-auto overflow-hidden p-0"
									>
										<Calendar
											captionLayout="dropdown"
											mode="single"
											onSelect={(date) => {
												if (date) {
													field.handleChange(date);
												}
											}}
											selected={field.state.value}
										/>
									</PopoverContent>
								</Popover>
							</FormField>
						)}
					</form.Field>
				</div>
				<div className="grid w-full gap-6">
					<form.Field name="time">
						{(field) => (
							<FormField
								errors={field.state.meta.errors.map((error) => (
									<FieldErrorMessage
										key={error?.message}
										message={error?.message}
									/>
								))}
								htmlFor="time"
								label="Time"
							>
								<Input
									className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
									id="time-picker"
									onChange={(e) => field.handleChange(e.target.value)}
									step="1"
									type="time"
									value={field.state.value}
								/>
							</FormField>
						)}
					</form.Field>
				</div>
			</div>
			<form.Subscribe
				selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<Button disabled={!canSubmit || isSubmitting} type="submit">
						{isSubmitting ? (
							<div className="flex items-center gap-2">
								<Loader2Icon className="h-4 w-4 animate-spin" />
								Adding...
							</div>
						) : (
							"Add Task"
						)}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
};

export default AddTaskForm;
