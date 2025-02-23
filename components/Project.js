import { Github, Globe } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Project = ({ title, description, ProjectImage, gitHub, Link }) => {
  return (
    <div className="w-full flex justify-center items-center my-5 text-light-100">
      <div className="bg-dark-900 shadow-lg shadow-black w-full">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Image
              onClick={() => {
                window.open(Link, "_blank");
              }}
              src={ProjectImage}
              alt={title}
              className="cursor-pointer md:w-full md:h-[300px] w-full h-[200px] object-cover bg-black rounded-lg"
            />
          </CardContent>

          <CardFooter>
            <div className="flex justify-evenly w-full">
              <div>
                <Github
                  className="cursor-pointer"
                  href={gitHub}
                  onClick={() => {
                    window.open(gitHub, "_blank");
                  }}
                />
              </div>
              <div>
                <Globe
                  className="cursor-pointer"
                  href={Link}
                  onClick={() => {
                    window.open(Link, "_blank");
                  }}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Project;
