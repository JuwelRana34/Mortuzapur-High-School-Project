"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils"; 
interface ModalProps {
  title: string;
  description?: string;
  trigger?: React.ReactElement;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export default function Modal({
  title,
  description,
  trigger,
  children,
  open,
  onOpenChange,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* asChild allows us to pass our own custom button/icon as the trigger */}
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}

      <DialogContent className={cn("sm:max-w-106.25", className)}>
        <DialogHeader>
          <DialogTitle className="text-gradient">{title}</DialogTitle>
          {/* Only render description if it exists to avoid empty DOM nodes */}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Render children for the modal body */}
        {children && <div className="py-2">{children}</div>}
      </DialogContent>
    </Dialog>
  );
}
