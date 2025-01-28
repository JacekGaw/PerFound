import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
    className?: string; // optional prop
    type?: "button" | "submit" | "reset"; // specific values allowed for the type prop
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // function type for onClick event
    disabled?: boolean; // boolean type for disabled prop
    children: React.ReactNode; // children prop to allow nested content
    name?: string;
    value?: string;
    variant?: number;
    disableAnimations?: boolean;
}

const Button:React.FC<ButtonProps> = ({className, type, onClick, disabled, children, name, value, variant = 0, disableAnimations = false}) => {

    const variants  = [
        {
            class: `${className} px-10 py-3 text-[#fefefe] flex justify-center items-center font-[500] bg-gradient-to-r from-[#e0942e] to-[#fc4545] rounded-md ${disabled ? "opacity-70" : "hover:-translate-x-0.5 hover:-translate-y-0.5" }`,
            initialMotion: {scale: 1, x:0},
            whileHoverMotion: disabled ? {scale: 1, x:0} : {scale: 1.01, x:-2, y:-2}
        },
        {
            class: "flex justify-center items-center p-2 rounded-lg",
            initialMotion: { x: 0 },
            whileHoverMotion: { x: -2 }
        }
    ]

    return (
        <motion.button
        initial={!disableAnimations ? variants[variant].initialMotion : undefined}
        whileHover={!disableAnimations ? variants[variant].whileHoverMotion : undefined}
        name={name} value={value}
        type={type} onClick={onClick} disabled={disabled} className={variants[variant].class}>
            {children}
        </motion.button>
    )
}

export default Button;