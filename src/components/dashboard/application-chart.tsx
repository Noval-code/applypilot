"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ApplicationChart({
  data,
}: {
  data: { status: string; total: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="font-display text-lg font-bold text-ink">Status distribution</CardTitle>
          <p className="mt-1 text-sm text-charcoal font-medium">
            Current movement across the hiring pipeline.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -28, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(32,32,32,0.08)" vertical={false} />
              <XAxis
                dataKey="status"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#575757", fontFamily: "monospace" }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#575757", fontFamily: "monospace" }}
              />
              <Tooltip
                cursor={{ fill: "#f3f0e8" }}
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "rgba(32,32,32,0.12)",
                  boxShadow: "none",
                  backgroundColor: "#ffffff",
                }}
              />
              <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="hsl(221.2 83.2% 53.3%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
