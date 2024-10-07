'use client';

import {Button} from "@/components/ui/button";
import {confirmation} from "@/stores/use-confirmation-store";
import React from "react";
import {toast} from "sonner";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {sheet} from "@/stores/use-sheet-store";
import {save} from "@/stores/use-save-store";
import {dialog} from "@/stores/use-dialog-store";

export default function ExampleComponents() {
  return (
    <div className={'flex flex-wrap justify-center items-center gap-2'}>
      <Card className={'w-full'}>
        <CardHeader>
          <CardTitle>Confirmation dialog</CardTitle>
          <CardDescription>Example of confirmation dialog</CardDescription>
        </CardHeader>
        <CardContent className={'flex flex-wrap justify-start items-center gap-2'}>
          <Button
            onClick={() => confirmation()}
          >Default</Button>
          <Button
            onClick={() => confirmation({
              onAction: () => {
                toast.success('ok');
              }
            })}
          >Action</Button>
          <Button
            onClick={() => confirmation({
              onAction: async () => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success('ok');
              }
            })}
          >Action loading</Button>
          <Button
            onClick={() => confirmation({
              onAction: async () => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.error('ok');
                throw new Error();
              }
            })}
          >Error</Button>
        </CardContent>
      </Card>
      <Card className={'w-full'}>
        <CardHeader>
          <CardTitle>Sheet</CardTitle>
          <CardDescription>Example of sheet</CardDescription>
        </CardHeader>
        <CardContent className={'flex flex-wrap justify-start items-center gap-2'}>
          <Button
            onClick={() => sheet({
              children: (
                <span>ok</span>
              )
            })}
          >Sheet</Button>
        </CardContent>
      </Card>
      <Card className={'w-full'}>
        <CardHeader>
          <CardTitle>Save</CardTitle>
          <CardDescription>Example of save</CardDescription>
        </CardHeader>
        <CardContent className={'flex flex-wrap justify-start items-center gap-2'}>
          <Button
            onClick={() => save()}
          >Default</Button>
          <Button
            onClick={() => save({
              onAction: async () => {
                toast.success('ok');
              }
            })}
          >Action</Button>
          <Button
            onClick={() => save({
              onAction: async () => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success('ok');
              }
            })}
          >Action loading</Button>
          <Button
            onClick={() => save({
              onAction: async () => {
                toast.error('ok');
                throw new Error();
              }
            })}
          >Error</Button>
          <Button
            onClick={() => save({
              onAction: async () => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.error('ok');
                throw new Error();
              }
            })}
          >Error loading</Button>
        </CardContent>
      </Card>
      <Card className={'w-full'}>
        <CardHeader>
          <CardTitle>Modal</CardTitle>
          <CardDescription>Example of modal</CardDescription>
        </CardHeader>
        <CardContent className={'flex flex-wrap justify-start items-center gap-2'}>
          <Button
            onClick={() => dialog({
              children: (
                <span>ok</span>
              )
            })}
          >Default</Button>
        </CardContent>
      </Card>
    </div>
  )
}