import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RegisterForm() {
    return (
        <form className="space-y-2">
            <div className="space-y-2">
                <div className="relative">
                    <Input
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        className="pl-10"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <div className="relative">
                    <Input
                        type="email"
                        placeholder="Nhập email"
                        className="pl-10"
                    />

                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
            </div>
            <div className="space-y-2">
                <Input
                    type="password"
                    placeholder="Nhập mật khẩu"
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-400"
            >
                Tạo tài khoản
            </Button>
        </form>
    )
}