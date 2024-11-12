"use client"

import { useAuthStore } from "@/stores/useAuthStore"
import { RomuHeader } from "@/components/organisms/RomuHeader"
import { CenteringLayout } from "@/components/atoms/CenteringLayout"

export default function Home() {
  const { accessToken } = useAuthStore()

  return (
    <div className=''>
      <RomuHeader type={accessToken ? "signed-in" : "before-signed-in"} />

      <main className='px-16 py-8'>
        <CenteringLayout>
          <section>
            <h1>RoMu - トレーニング記録アプリ</h1>
          </section>

          <section>
            <h2></h2>

            <table>
              <thead>
                <tr>
                  <th>日付</th>
                  <th>ワークアウト</th>
                  <th>セット</th>
                  <th>記憶率</th>
                  <th>記憶速度</th>
                  <th>記憶力</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2021-10-01</td>
                  <td>ベンチプレス</td>
                  <td>10</td>
                  <td>100%</td>
                  <td>1.0</td>
                  <td>100%</td>
                </tr>
                <tr>
                  <td>2021-10-02</td>
                  <td>00:20:00</td>
                  <td>20</td>
                  <td>100%</td>
                  <td>1.0</td>
                  <td>100%</td>
                </tr>
                <tr>
                  <td>2021-10-03</td>
                  <td>00:30:00</td>
                  <td>30</td>
                  <td>100%</td>
                  <td>1.0</td>
                  <td>100%</td>
                </tr>
              </tbody>
            </table>
          </section>
        </CenteringLayout>
      </main>

      <footer className=''></footer>
    </div>
  )
}
