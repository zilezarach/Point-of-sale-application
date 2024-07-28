import { NextResponse } from "next/server";
import { getEmployees, createEmployee } from "../../../lib/employees";

export async function GET() {
  const employees = await getEmployees();
  return NextResponse.json(employees);
}

export async function POST(req) {
  const newEmployee = await req.json();
  const employee = await createEmployee(newEmployee);
  return NextResponse.json(employee, { status: 201 });
}
