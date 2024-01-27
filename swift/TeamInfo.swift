//  Page2TeamInfo.swift
//  Scouting FRC
//  Created by Joy Pan on 1/25/24.

import SwiftUI
struct ContentView1: View {
    var body: some View {
        VStack() {
            GroupBox() {
                Text("Team Info")
                    .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                    .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                
                Divider()
                
            }
            Spacer()
            
            Grid {
                GridRow {
                    Text("hello")
                    Text("hi")
                }
                GridRow {
                    Text("helllllooo")
                    Text("hiiiii")
                    Text("weeee")
                }
                
            }
            
            
            GroupBox() {
                Text("Done")
            }
            
        }
        
        
       

        
    }
}

#Preview {
    ContentView1()
}
