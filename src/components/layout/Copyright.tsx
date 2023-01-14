import Link from "@mui/material/Link"

interface CopyrightProps {
  color?: "text.secondary" | "white"
}

export default function Copyright({ color }: CopyrightProps) {
  return (
    <Link
      href="https://github.com/maxmonis"
      mb={4}
      rel="noopener noreferrer"
      target="_blank"
      underline="hover"
      {...(color ? { sx: { color } } : {})}
    >
      © Max Monis {new Date().getFullYear()}
    </Link>
  )
}
