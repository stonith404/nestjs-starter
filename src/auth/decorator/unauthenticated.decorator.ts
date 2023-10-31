import { SetMetadata } from "@nestjs/common";

const AllowUnauthenticated = () => SetMetadata("allowUnauthenticated", true);

export default AllowUnauthenticated;
