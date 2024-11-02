import Image from "next/image"

export function BrandSection() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-orange-500 text-2xl font-bold tracking-tight">RAIL WAY</h1>
                <p className="text-orange-500 text-xl">Welcome to rail way</p>
            </div>

            <div className="relative aspect-[4/3]">
                <Image
                    src="/images/train.png"
                    alt="Train Illustration"
                    width={600}
                    height={300}
                    className="object-contain rounded-lg"
                    priority
                />
            </div>

        </div>
    )
}