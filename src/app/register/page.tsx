import { redirect } from "next/navigation";

export default function RegisterPage() {
  redirect("/login"); // or '/' for home
}

// Disable for a while until we have the registration flow ready. We don't want users to see

// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { useTheme } from "@/contexts/theme-context";
// import { cn } from "@/lib/utils";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { customFetch } from "@/lib/utils/custom-fetch";

// export default function RegisterPage() {
//   const { theme } = useTheme();
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     // Client-side validation
//     if (password.length < 8) {
//       setError("Kata laluan mesti sekurang-kurangnya 8 aksara");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Kata laluan tidak sepadan");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await customFetch("/auth/register", {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//           password,
//           name: name.trim() || undefined,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Pendaftaran gagal");
//         setIsLoading(false);
//         return;
//       }

//       // Redirect to home after successful registration
//       router.push("/");
//     } catch {
//       setError("Ralat berlaku. Sila cuba lagi.");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
//       <Card className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white/80 backdrop-blur-sm shadow-xl border-blue-100">
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <h1
//             className={cn(
//               "text-2xl sm:text-3xl font-bold bg-linear-to-r bg-clip-text text-transparent",
//               theme.gradient.primary,
//             )}
//           >
//             Daftar Akaun
//           </h1>
//           <p className="text-sm sm:text-base text-slate-600">
//             Cipta akaun untuk mula membuat kad digital anda
//           </p>
//         </div>

//         {/* Register Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
//               {error}
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="name" className="text-slate-700">
//               Nama Penuh <span className="text-slate-400">(Pilihan)</span>
//             </Label>
//             <Input
//               id="name"
//               type="text"
//               placeholder="Nama anda"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-slate-700">
//               Emel
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="nama@contoh.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password" className="text-slate-700">
//               Kata Laluan
//             </Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Min. 8 aksara"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
//             />
//             <p className="text-xs text-slate-500">
//               Sekurang-kurangnya 8 aksara
//             </p>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="confirmPassword" className="text-slate-700">
//               Sahkan Kata Laluan
//             </Label>
//             <Input
//               id="confirmPassword"
//               type="password"
//               placeholder="Masukkan semula kata laluan"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
//             />
//           </div>

//           <Button
//             type="submit"
//             disabled={isLoading}
//             className={cn(
//               "w-full bg-linear-to-r text-white font-semibold py-5 sm:py-6 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/60 transition-all",
//               theme.gradient.primary,
//             )}
//           >
//             {isLoading ? "Memuatkan..." : "Daftar"}
//           </Button>
//         </form>

//         {/* Footer Links */}
//         <div className="text-center space-y-2 pt-4 border-t border-blue-100">
//           <p className="text-sm text-slate-600">
//             Sudah mempunyai akaun?{" "}
//             <Link
//               href="/login"
//               className={cn("font-semibold hover:underline", theme.colors.icon)}
//             >
//               Log masuk
//             </Link>
//           </p>
//           <Link
//             href="/"
//             className="text-sm text-slate-500 hover:text-slate-700 block"
//           >
//             ← Kembali ke laman utama
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// }
