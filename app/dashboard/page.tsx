import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"

import data from "./data.json"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { IconCloud } from "@tabler/icons-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <>
      <SiteHeader />
      {/* <div className="flex flex-1 flex-col"> */}
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          {/* <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div> */}
          <Empty className="border border-dashed mx-6">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconCloud />
              </EmptyMedia>
              <EmptyTitle>Engram catalog Empty</EmptyTitle>
              <EmptyDescription>
                Upload moments to your engram catalog to access them later.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button variant="outline">upload now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name-1">Name</Label>
                        <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="username-1">Username</Label>
                        <Input id="username-1" name="username" defaultValue="@peduarte" />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
            </EmptyContent>
          </Empty>
        </div>
      </div>
      {/* </div> */}
      <div className="flex flex-1 p-1 flex-col justify-center items-center">
      </div>
    </>
  )
}
