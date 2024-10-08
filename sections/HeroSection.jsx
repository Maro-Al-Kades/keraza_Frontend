"use client";

import { Button } from "@nextui-org/button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "@/redux/api/categoryApiCall";
import { getUsersCount } from "@/redux/api/profileApiCall";
import { getProjectsCount } from "@/redux/api/projectApiCall";
import { fetchAllComments } from "@/redux/api/commentApiCall";

const Hero = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { projectsCount } = useSelector((state) => state.project);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    AOS.init({ duration: 800 });

    dispatch(fetchAllCategories());
    dispatch(getUsersCount());
    dispatch(getProjectsCount());
    dispatch(fetchAllComments());
  }, []);

  return (
    <>
      <section className="w-full flex flex-col lg:flex-row items-center justify-between py-20 lg:py-10 ">
        <div
          className="flex flex-col items-center gap-8 lg:gap-12 lg:max-w-[700px] flex-1 text-center lg:text-right"
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          {/* <Glow className="-right-72" /> */}
          <div className="flex flex-col gap-10">
            <h1
              className={
                "text-3xl md:text-5xl font-semibold leading-normal py-2 from-primary to-secondary bg-clip-text text-transparent bg-gradient-to-b"
              }
            >
              موقع مهرجان الكرازة الخاص <br />
              بكنيسة العذراء مريم والقديس مارمينا بالمرج
            </h1>

            <p className={clsx("text-base md:text-xl")}>
              مرحبا بكم في مهرجان الكرازة! نحن هنا لنحتفل معكم بمناسبة رائعة
              مليئة بالأنشطة والفعاليات الممتعة. انضموا إلينا في هذا الحدث
              الفريد، واستمتعوا بتجربة مميزة تجمع بين الثقافة والتراث والفن.
              نتطلع إلى لقائكم ومشاركتكم هذه اللحظات الجميلة!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Button
              fullWidth
              variant="shadow"
              color="primary"
              className="text-md"
              as={Link}
              href="/projects"
            >
              تعرف علي المشاريع
            </Button>
            <Button
              fullWidth
              variant="flat"
              color="primary"
              className="text-md"
              as={Link}
              href="/categories"
            >
              تصفح الاقسام
            </Button>
          </div>

          <div className="flex flex-row gap-6 w-full justify-between">
            <div className="text-center flex-1">
              <div className="text-2xl md:text-4xl font-bold">
                {projectsCount}
              </div>
              <div className="text-gray-600">مشروع</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl md:text-4xl font-bold">
                {usersCount}
              </div>
              <div className="text-gray-600">مستخدم</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl md:text-4xl font-bold">
                {categories?.length}
              </div>
              <div className="text-gray-600">قسم</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl md:text-4xl font-bold">
                {comments?.length}
              </div>
              <div className="text-gray-600">تعليق</div>
            </div>
          </div>
        </div>

        <div
          className="w-full md:w-1/2 flex justify-end mt-8 md:mt-0"
          data-aos="fade-right"
          data-aos-offset="200"
        >
          <Image src="/hero.svg" width={600} height={600} alt="hero-img" />
        </div>
      </section>
    </>
  );
};

export default Hero;
