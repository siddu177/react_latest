import { PageHeader, PageHeaderHeading } from "../pages/page-header";
import {BreadcrumbWithCustomSeparator } from "../breadcrumbs"
import CollapsibleCard from "./kpi";
export default function DetailsWrapper() {

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Details </PageHeaderHeading>
                <BreadcrumbWithCustomSeparator />
            </PageHeader>
            <CollapsibleCard/>
        </>
    )

}