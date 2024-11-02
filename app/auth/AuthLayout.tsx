import * as React from "react"
import { Card } from "@/components/ui/card"
import { BrandSection } from "./BrandSection"
import { AuthForms } from "./AuthForm"

export function AuthLayout() {
    return (
        <div className="container-custom flex items-center justify-center p-4">
            <Card className="w-full grid md:grid-cols-2 gap-6 p-6 ">
                <BrandSection />
                <AuthForms />
            </Card>
        </div>
    )
}