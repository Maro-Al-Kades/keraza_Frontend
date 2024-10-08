"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Button,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { GiBackForth } from "react-icons/gi";
import Link from "next/link";
import { Pagination } from "@nextui-org/pagination";
import { deleteProject, getAllProjects } from "@/redux/api/projectApiCall";
import AOS from "aos";

const columns = [
  { name: "اسم المشروع", uid: "username" },
  { name: "الناشر", uid: "role" },
  { name: "القسم", uid: "status" },
  { name: "التعديلات", uid: "actions" },
];

export default function AdminProjects() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    AOS.init({ duration: 800 });
    window.scrollTo(0, 0);

    dispatch(getAllProjects());
  }, [dispatch]);

  const pages =
    projects?.length > 0 ? Math.ceil(projects?.length / rowsPerPage) : 0;

  // Filtered projects for current page
  const paginatedProjects = projects?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const deleteProjectHandler = (projectId) => {
    dispatch(deleteProject(projectId));
  };

  return (
    <>
      <div className="p-4">
        <Button
          color="warning"
          as={Link}
          href="/admin"
          endContent={<GiBackForth size={18} />}
        >
          الرجوع إلي لوحة التحكم
        </Button>
      </div>

      <Table
        data-aos="fade-left"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className="text-md font-bold text-primary"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedProjects}>
          {(item) => (
            <TableRow key={item?._id}>
              <TableCell>
                <User
                  avatarProps={{ radius: "lg", src: item?.image?.url }}
                  description={item?.email}
                  name={item?.title}
                />
              </TableCell>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: item?.user?.profilePhoto?.url,
                  }}
                  name={item?.user?.username}
                />
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  size="md"
                  color="primary"
                  variant="flat"
                >
                  {item?.category}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center justify-center gap-3">
                  <Button
                    endContent={<FaRegEye size={18} />}
                    size="sm"
                    as={Link}
                    href={`/projects/${item?._id}`}
                    target="_blank"
                  >
                    مشاهدة المشروع
                  </Button>
                  <Button
                    endContent={<CiTrash size={18} />}
                    color="danger"
                    variant="flat"
                    size="sm"
                    onClick={() => deleteProjectHandler(item?._id)}
                  >
                    حذف المشروع
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex w-full justify-center mt-4">
        <Pagination
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
}
