"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
const [formState, setFormState] = useState({
name: "",
email: "",
message: "",
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<
"idle" | "success" | "error"
>("idle");

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setIsSubmitting(true);

try {
	const response = await fetch('/api/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: formState.name,
			email: formState.email,
			message: formState.message,
		}),
	});

	const data = await response.json();

	if (response.ok) {
		setSubmitStatus("success");
		setFormState({ name: "", email: "", message: "" });
	} else {
		console.error('Form submission error:', data.error);
		setSubmitStatus("error");
	}
} catch (error) {
	console.error('Failed to submit form:', error);
	setSubmitStatus("error");
} finally {
	setIsSubmitting(false);
}
};

return (
<motion.div
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.5 }}
	className="space-y-6 max-w-2xl mx-auto"
>
	<div className="text-left">
	<h1 className="text-3xl font-pixel text-dracula-pink mb-4">
		Contact Me
	</h1>
	<p className="text-dracula-foreground">
		Get in touch for any inquiries or collaborations.
	</p>
	</div>

	<form onSubmit={handleSubmit} className="space-y-6">
	<div className="space-y-2">
		<label htmlFor="name" className="block font-pixel text-dracula-foreground">
		Name
		</label>
		<input
		id="name"
		type="text"
		required
		value={formState.name}
		onChange={(e) =>
			setFormState((prev) => ({ ...prev, name: e.target.value }))
		}
		className="w-full px-4 py-2 bg-dracula-background border-2 border-dracula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-dracula-purple text-dracula-foreground placeholder-dracula-comment"
		placeholder="Your name"
		/>
	</div>

	<div className="space-y-2">
		<label htmlFor="email" className="block font-pixel text-dracula-foreground">
		Email
		</label>
		<input
		id="email"
		type="email"
		required
		value={formState.email}
		onChange={(e) =>
			setFormState((prev) => ({ ...prev, email: e.target.value }))
		}
		className="w-full px-4 py-2 bg-dracula-background border-2 border-dracula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-dracula-purple text-dracula-foreground placeholder-dracula-comment"
		placeholder="your.email@example.com"
		/>
	</div>

	<div className="space-y-2">
		<label
		htmlFor="message"
		className="block font-pixel text-dracula-foreground"
		>
		Message
		</label>
		<textarea
		id="message"
		required
		value={formState.message}
		onChange={(e) =>
			setFormState((prev) => ({ ...prev, message: e.target.value }))
		}
		rows={5}
		className="w-full px-4 py-2 bg-dracula-background border-2 border-dracula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-dracula-purple text-dracula-foreground placeholder-dracula-comment resize-none"
		placeholder="Your message here..."
		/>
	</div>

	<button
		type="submit"
		disabled={isSubmitting}
		className={`w-full py-3 font-pixel text-lg rounded-md transition-all duration-200 ${
		isSubmitting
			? "bg-dracula-comment cursor-not-allowed"
			: "bg-dracula-pink hover:bg-dracula-purple text-dracula-white"
		}`}
	>
		{isSubmitting ? (
			<span className="flex items-center justify-center">
				<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Sending...
			</span>
		) : "Send Message"}
	</button>

	{submitStatus === "success" && (
		<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		className="p-4 bg-dracula-green/20 border border-dracula-green rounded-md"
		>
		<p className="text-left text-dracula-green font-pixel">
			Message sent successfully! We'll get back to you soon.
		</p>
		</motion.div>
	)}

	{submitStatus === "error" && (
		<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		className="p-4 bg-dracula-red/20 border border-dracula-red rounded-md"
		>
		<p className="text-left text-dracula-red font-pixel">
			Error sending message. Please try again or contact us directly.
		</p>
		</motion.div>
	)}
	</form>
</motion.div>
);
}
