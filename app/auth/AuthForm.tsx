"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./Login/LoginForm"
import { RegisterForm } from "./Register/RegisterForm"

export function AuthForms() {
    return (
        <div className="flex flex-col justify-between">
            <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login" className="data-[state=active]:bg-orange-500 box-sizing: border-box data-[state=active]:text-white hover:bg-orange-100">
                        ĐĂNG NHẬP
                    </TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-orange-500 box-sizing: border-box  data-[state=active]:text-white hover:bg-orange-100">
                        ĐĂNG KÝ
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>

                <TabsContent value="register">
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}