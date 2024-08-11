import { signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

type Props = {
  title: string;
  titleFooter: string;
  hrefFooter: string;
};
export default function CardWrapper({ title, titleFooter, hrefFooter }: Props) {
  return (
    <Card className="w-300 md:w-[400px] shadow-lg bg-honey border-2 border-primary border-solid">
      <CardHeader className="flex items-center gap-4">
        <Image
          src="/images/logo.png"
          width={200}
          height={100}
          alt="Logo"
          style={{ objectFit: "contain" }}
        />
        <CardTitle className="font-normal pb-6 text-white">{title}</CardTitle>
        <div className="w-[300px] flex flex-col gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("facebook");
            }}
          >
            <Button
              type="submit"
              variant={"outline"}
              size="full"
              className="flex gap-2 items-center"
            >
              <FaFacebook className="text-sky-600 text-xl" />
              Continue with Facebook
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button
              variant={"outline"}
              size="full"
              className="flex gap-2 items-center"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button
              variant={"outline"}
              size="full"
              className="flex gap-2 items-center"
            >
              <FaGithub className="text-xl" />
              Continue with Github
            </Button>
          </form>
          <Button
            variant={"link"}
            className="flex gap-2 items-center text-white hover:text-primary"
          >
            <Link href={hrefFooter}>{titleFooter}</Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
