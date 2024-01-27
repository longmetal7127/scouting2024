//
//  ContentView.swift
//  Scouting FRC
//
//  Created by Joy Pan on 1/25/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        
        ZStack {
            VStack {
                GroupBox() {
                    Text("Teams")
                        .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                        .font(.title)
                    Divider()
                }.groupBoxStyle(TransparentGroupBox())
                
                Spacer()
                GroupBox() {
                    List {
                        Text("7127 Longmetal                                                   5/5                                                         Edit")
                        Text("8237 TestTeam                                                    4/5                                                         Edit")
                        Text("3753 TestTeam                                                    2/5                                                         Edit")
                        Text("2374 TestTeam                                                    3/5                                                         Edit")
                        Text("239 TestTeam                                                      0/5                                                         Edit")
                        Text("1924 TestTeam                                                    1/5                                                          Edit")
                        Text("2374 TestTeam                                                    5/5                                                         Edit")
                        Text("239 TestTeam                                                      5/5                                                         Edit")
                        Text("1924 TestTeam                                                    1/5                                                         Edit")
                        Text("2374 TestTeam                                                    2/5                                                         Edit")
                        Text("239 TestTeam                                                      4/5                                                         Edit")
                        Text("1924 TestTeam                                                    3/5                                                         Edit")
                    }
                }
                
                GroupBox() {
                    Button("+") {
                        
                    }
                }
                
            }

        }
    }
}


struct TransparentGroupBox: GroupBoxStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.content
            .background(Rectangle()
                .fill(Color.init(white: 0.93))
                .frame(height:70)
            )
    }
}

#Preview {
    ContentView()
}
