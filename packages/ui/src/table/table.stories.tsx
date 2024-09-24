import type { Meta, StoryObj } from "@storybook/react";
import { Article } from "../article";
import { Table, Td, Th, Tr } from "./table";

const meta: Meta<typeof Table> = {
	title: "Components/Table",
	component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Overview: Story = {
	render: () => (
		<Article>
			<Table>
				<thead>
					<Tr>
						<Th>Header 1</Th>
						<Th>Header 2</Th>
						<Th>Header 3</Th>
					</Tr>
				</thead>
				<tbody>
					<Tr>
						<Td>Cell 1</Td>
						<Td>Cell 2</Td>
						<Td>Cell 3</Td>
					</Tr>
					<Tr>
						<Td>Cell 4</Td>
						<Td>Cell 5</Td>
						<Td>Cell 6</Td>
					</Tr>
					<Tr>
						<Td>Cell 7</Td>
						<Td>Cell 8</Td>
						<Td>Cell 9</Td>
					</Tr>
				</tbody>
			</Table>
		</Article>
	),
};
