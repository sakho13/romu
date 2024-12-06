import { joinClassName } from "@/services/functions/joinClassName"
import { RomuCollapse } from "../atoms/RomuCollapse"

type Feature = {
  label: string
  description: string
}

export function RomuFeaturesCollapses() {
  const features: Feature[] = [
    {
      label: "トレーニング記録",
      description: "日々のトレーニングをシンプルに記録",
    },
    {
      label: "トレーニングメニュー",
      description: "あなただけのトレーニングメニューを作成し、記録",
    },
    // {
    //   label: "トレーニングの見える化",
    //   description: "記録したトレーニングを可視化",
    // },
  ]

  return features.map((feature, index) => (
    <RomuCollapse
      key={index}
      tabIndex={0}
      label={feature.label}
      className={joinClassName(index > 0 ? "mt-4" : "", "lg:w-[480px]")}
    >
      <p>{feature.description}</p>
    </RomuCollapse>
  ))
}
